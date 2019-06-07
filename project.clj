(defproject workflow-shell "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [
                 [org.clojure/clojure "1.8.0"]
                ;  [cli-matic "0.3.7"],
                ;  [com.palletops/cli-cmds "0.1.1"],
                 [org.clojure/tools.cli "0.4.2"]
                 [org.clojure/spec.alpha "0.2.176"]
                 [org.clojure/core.specs.alpha "0.2.44"]
                 [org.clojure/tools.namespace "0.2.11"]]
  :main ^:skip-aot workflow-shell.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
