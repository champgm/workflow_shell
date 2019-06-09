(ns workflow-shell.commands.git.add_dot
  (:require [clojure.java.shell :refer [sh]])
  (:gen-class))

(def gad (hash-map
         :description "Stages all files and folders in the current directory"
         :execute (fn [& args]
                    (let [result  (sh "git" "add" ".")]
                      (if-not (empty? (:out result))
                        (println (:out result))
                        (println (:err result)))))))