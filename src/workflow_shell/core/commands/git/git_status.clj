(ns workflow-shell.core.commands.git.git_status
  (:require [clojure.tools.cli :refer [parse-opts]])
  (:gen-class))

(defn gs [& args]
  (println "git status called"))