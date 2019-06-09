(ns workflow-shell.commands.git.pretty
  (:require [clojure.java.shell :refer [sh]])
  (:gen-class))

(def gpretty (hash-map
              :description "Displays the git log with each commit taking only one line"
              :execute (fn [& args]
                         (let [result  (sh "git", "log", "--pretty=oneline")]
                           (if-not (empty? (:out result))
                             (println (:out result))
                             (println (:err result)))))))