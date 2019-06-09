(ns workflow-shell.core
  (:require [clojure.tools.cli :refer [parse-opts]])
  (:require [clojure.tools.namespace.find :refer [find-namespaces-in-jarfile]])
  (:gen-class))

(def cli-options
  [["-h" "--help"]])

;; https://stackoverflow.com/questions/9694754/clojure-how-to-get-the-path-of-a-running-jar-root-source-directory
(defn this-jar
  "utility function to get the name of jar in which this function is invoked"
  [& [ns]]
  ;; The .toURI step is vital to avoid problems with special characters,
  ;; including spaces and pluses.
  ;; Source: https://stackoverflow.com/q/320542/7012#comment18478290_320595
  (-> (or ns (class *ns*))
      .getProtectionDomain .getCodeSource .getLocation .toURI .getPath))

(defn is-command "Check a namespace to see if it's got the correct structure indicating a command" [string]
  (clojure.string/includes? string "workflow-shell.commands"))

(defn command-namespaces []
  (let [jar-file (java.util.jar.JarFile. (this-jar))]
    (let [jar-namespaces (find-namespaces-in-jarfile jar-file)]
      (filter (fn check-if-command [namespace] (is-command namespace)) jar-namespaces))))

(defn get-commands
  [found-namespaces]
  (apply merge
         (map (fn map-to-commands [namespace-string] (ns-publics namespace-string))
              found-namespaces)))

(defn print-help "Print all known commands and their descriptions"
  [desired-command-name all-commands]
  (when-not (nil? desired-command-name)
    (println "Command" desired-command-name "not found"))
  (println "Supported commands:")
  (doseq [command all-commands]
    (println "\t" (first command) "\t-" (:description (var-get (first (rest command))))))
  ;; Abort 'cause, if help was printed, something went wrong
  (System/exit 0))

(defn -main [& args]
  (let [{:keys [options arguments errors summary]} (parse-opts args cli-options :in-order true)
        found-namespaces (command-namespaces)]

    ; Require all discovered commands
    (doseq [namespace-string found-namespaces] (require namespace-string))

    (let
     [all-commands (get-commands found-namespaces)
      ;all-command-names (keys all-commands)
      desired-command-name (first arguments)]
      ; (println "     all-command-names: " all-command-names)
      ; (println "     type all-commands: " (type all-commands))
      ; (println "     all-commands keys: " (keys all-commands))
      ; (println "     desired command nmae: " desired-command-name)

      ; Abort if no command was given
      (when (nil? desired-command-name) (print-help desired-command-name all-commands))

      (let
       [desired-command (var-get ((symbol desired-command-name) all-commands))]
        ; Abort if desired command isn't known
        (when (nil? desired-command) (print-help desired-command-name all-commands))
        (apply (:execute desired-command) (rest arguments)))))
  (System/exit 0))
