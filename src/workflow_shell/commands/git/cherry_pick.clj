(ns workflow-shell.commands.git.cherry_pick
  (:require [clojure.tools.cli :refer [parse-opts]])
  (:require [clojure.java.shell :refer [sh]])
  (:gen-class))

(def gcp (hash-map
          :description "Takes one argument, the commit SHA. Cherry picks that commit"
          :execute (fn [& args]
                     (let [{:keys [arguments]} (parse-opts args [])
                           sha (if (nil? (first arguments))
                                 ((println "SHA is required")
                                  (System/exit 1))
                                 (first arguments))
                           result (sh "git" "cherry-pick" sha)]
                       (if-not (empty? (:out result))
                         (println (:out result))
                         (println (:err result)))))))