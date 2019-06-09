(ns workflow-shell.commands.git.git_status
  ; (:require [clojure.tools.cli :refer [parse-opts]])
  (:require [clojure.java.shell :refer [sh]])
  (:gen-class))

(def gs (hash-map
         :description "Runs 'git status'"
         :execute (fn [& args]
                    (let [result  (sh "git" "status")]
                      (if-not (empty? (:out result))
                        (println (:out result))
                        (println (:err result)))))))