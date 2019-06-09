(ns workflow-shell.commands.git.status
  (:require [clojure.java.shell :refer [sh]])
  (:gen-class))

(def gs (hash-map
         :description "Displays the current status of the git repository"
         :execute (fn [& args]
                    (let [result  (sh "git" "status")]
                      (if-not (empty? (:out result))
                        (println (:out result))
                        (println (:err result)))))))