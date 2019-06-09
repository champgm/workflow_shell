(ns workflow-shell.commands.git.checkout_branch
  (:require [clojure.tools.cli :refer [parse-opts]])
  (:require [clojure.java.shell :refer [sh]])
  (:gen-class))

(def gcb (hash-map
          :description "Takes one argument, the name of the branch. Checks out a new branch"
          :execute (fn [& args]
                     (let [{:keys [arguments]} (parse-opts args [])
                           branch-name (if (nil? (first arguments))
                                         ((println "Branch name is required")
                                          (System/exit 1))
                                         (first arguments))
                           result (sh "git" "checkout" "-b" branch-name)]
                       (if-not (empty? (:out result))
                         (println (:out result))
                         (println (:err result)))))))