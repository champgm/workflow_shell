(ns workflow-shell.commands.git.git_commit_all_message
  (:require [clojure.tools.cli :refer [parse-opts]])
  (:require [clojure.java.shell :refer [sh]])
  (:gen-class))

(def gcam (hash-map
           :description "Runs 'git commit --all --message'"
           :execute (fn [& args]
                      (let [{:keys [arguments]} (parse-opts args [])
                            commit-message (if (nil? (first arguments)) "Test commit, please fixup" (first arguments))
                            result (sh "git" "commit" "--all" "--message" commit-message)]
                        (if-not (empty? (:out result))
                          (println (:out result))
                          (println (:err result)))))))