(ns workflow-shell.core
  (:require [clojure.tools.cli :refer [parse-opts]])
  (:require [clojure.tools.namespace.find :refer [find-namespaces-in-jarfile]])
  ; (:require workflow-shell.commands);;.git.git_status)
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

(def command-namespaces
  (let [jarfile (java.util.jar.JarFile. (this-jar))]
    (filter
     (fn [x] (.contains x "workflow-shell.commands"))
     (find-namespaces-in-jarfile jarfile))))

  ; )


(defn -main [& args]
  (let [{:keys [options arguments errors summary]} (parse-opts args cli-options :in-order true)
        jarfile (java.util.jar.JarFile. (this-jar))]
    (println "options:" options)
    (println arguments)
    (println (all-ns))
    (println jarfile)
    (println (this-jar))
    (println (find-namespaces-in-jarfile jarfile))
    (println command-namespaces
    ; (println (keys (ns-publics 'workflow-shell.core.commands.git.git_status)))
    ;  (println (keys (ns-publics 'workflow-shell.commands.*)))
             )))
