TAG ?= $(shell git rev-parse --abbrev-ref HEAD)

DIND_PREFIX ?= $(HOME)
ifneq ($(HOST_PATH),)
DIND_PREFIX := $(HOST_PATH)
endif
ifeq ($(CACHE_PREFIX),)
	CACHE_PREFIX=/tmp
endif
ifeq ($(CACHE_PREFIX),)
	CACHE_PREFIX=/tmp
endif

UID=$(shell id -u)
PREFIX=$(shell echo $(PWD) | sed -e s:$(HOME):$(DIND_PREFIX):)
NPM_PREFIX=$(PREFIX)/tmp/$(UID)/node-modules

clean:
	rm -rf $(PWD)/build
	rm -rf $(PWD)/tmp

build-deps:
	mkdir -p $(PWD)/tmp/$(UID)

build: clean build-deps
	docker build \
		--build-arg CI_PIPELINE_ID=${CI_PIPELINE_ID} \
		--build-arg BUILD_TYPE=${BUILD_TYPE} \
		-t ${TAG} .
 
.PHONY: all build 

test:
	docker-compose -f deployments/test/docker-compose.yml down -v || true
	docker build -t cdi/jd-docter:test -f ./deployments/test/Dockerfile  .
	docker-compose -f deployments/test/docker-compose.yml run --rm test
