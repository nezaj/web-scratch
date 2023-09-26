MAKEFLAGS = --no-print-directory --always-make --silent
MAKE = make $(MAKEFLAGS)

dev:
	@echo "Booting up dev..."
	yarn start

publish:
	@echo "Building + Publishing Packages..."
	./scripts/publish_packages.clj
