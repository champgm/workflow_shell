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

(defn command-namespaces "Filter out non-command namespaces" []
  (let [jar-file (java.util.jar.JarFile. (this-jar))]
    (let [jar-namespaces (find-namespaces-in-jarfile jar-file)]
      (filter (fn check-if-command [namespace] (is-command namespace)) jar-namespaces))))

(defn get-commands "Get command objects from namespaces" [found-namespaces]
  (apply merge
         (map (fn map-to-commands [namespace-string] (ns-publics namespace-string))
              found-namespaces)))

(defn print-help "Print all known commands and their descriptions, then exit"
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
      desired-command-name (first arguments)]

      ; Abort if no command was given
      (when (nil? desired-command-name) (print-help desired-command-name all-commands))
      ; Or if command is unknown
      (when (nil? ((symbol desired-command-name) all-commands)) (print-help desired-command-name all-commands))

      (let
       [desired-command (var-get ((symbol desired-command-name) all-commands))]
        (apply (:execute desired-command) (rest arguments)))))
  (System/exit 0))
