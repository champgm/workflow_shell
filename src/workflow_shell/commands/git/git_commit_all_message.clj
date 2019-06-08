(ns workflow-shell.commands.git.git_commit_all_message
  (:require [clojure.tools.cli :refer [parse-opts]])
  (:gen-class))

(defn gcam [& args]
  (println "git commit all message called"))