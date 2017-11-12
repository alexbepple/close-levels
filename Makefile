
run := yarn run

verify:
	$(run) test

artefact:
	$(run) dist

.DEFAULT_GOAL := verified-artefact
verified-artefact: verify artefact
