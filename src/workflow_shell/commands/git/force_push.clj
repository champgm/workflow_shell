(ns workflow-shell.commands.git.force_push
  (:require [clojure.java.shell :refer [sh]])
  (:gen-class))

(def gpfo (hash-map
           :description "Force pushes the current branch into a remote branch of the same name"
           :execute (fn [& args]
                      (let [branch-name (clojure.string/trim (:out (sh "git" "rev-parse" "--abbrev-ref" "HEAD")))
                            result  (sh "git" "push" "-f" "origin" branch-name)]
                        (println result)
                        (if-not (empty? (:out result))
                          (println (:out result))
                          (println (:err result)))))))