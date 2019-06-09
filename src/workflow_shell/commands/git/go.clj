(ns workflow-shell.commands.git.go
  (:require [clojure.java.shell :refer [sh]])
  (:require [workflow-shell.commands.git.commit_all_message :refer [gcam]])
  (:gen-class))

(def ggo (hash-map
         :description "Takes one optional argument, number of commits to rebase. Commits all staged changes, rebases interactively, amends the most recent commit, then force pushes"
         :execute (fn [& args]
                    (let [removal (sh "git" "rm" "-r" "--cached" ".")
                          addition (sh "git" "add" ".")]
                      (if-not (empty? (:out removal))
                        (println (:out removal))
                        ((println (:err removal))
                         (System/exit 0)))
                      (if-not (empty? (:out addition))
                        (println (:out addition))
                        ((println (:err addition))
                         (System/exit 0)))
                      ((:execute gcam) "Fixed gitignore")))))