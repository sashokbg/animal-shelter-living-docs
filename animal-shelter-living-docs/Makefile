.PHONY: dev
.ONESHELL: dev

SHELL=/bin/zsh

dev:
	source ~/.config/zsh/.zshrc && \
	conda deactivate && \
	conda activate animal_shelter_docs && \
	mkdocs serve
