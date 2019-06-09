(ns workflow-shell.commands.git.commit_all_message
  (:require [clojure.tools.cli :refer [parse-opts]])
  (:require [clojure.java.shell :refer [sh]])
  (:gen-class))

(def gcam (hash-map
           :description "Takes one optional argument, the message. Commits all staged changes with the given message. Uses a default if no message given."
           :execute (fn [& args]
                      (let [{:keys [arguments]} (parse-opts args [])
                            commit-message (if (nil? (first arguments)) "Test commit, please fixup" (first arguments))
                            result (sh "git" "commit" "--all" "--message" commit-message)]
                        (if-not (empty? (:out result))
                          (println (:out result))
                          (println (:err result)))))))