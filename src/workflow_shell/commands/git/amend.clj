(ns workflow-shell.commands.git.amend
  (:require [clojure.java.shell :refer [sh]])
  (:gen-class))

(def ga (hash-map
         :description "Amends the most recent commit to ensure that it has the correct author and an updated timestamp"
         :execute (fn [& args]
                    (let [result  (sh "git" "commit" "--amend" "--reset-author" "--no-edit")]
                      (if-not (empty? (:out result))
                        (println (:out result))
                        (println (:err result)))))))