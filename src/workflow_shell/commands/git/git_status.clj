(ns workflow-shell.commands.git.git_status
  (:require [clojure.tools.cli :refer [parse-opts]])
  (:gen-class))

; (defn gs [& args]
;   (println "git status called"))

(def gs (hash-map
         :description "Runs 'git status'"
         :execute (fn [& args] (println "git status called"))))