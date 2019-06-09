(ns workflow-shell.commands.git.status
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