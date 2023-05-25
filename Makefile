export COMPOSE_COMMAND        := docker-compose --project-name digicommerce
export COMPOSE_IGNORE_ORPHANS := true

all: dev
clean:;  rm -f -r "code/build" "code/dist" "code/node_modules"
dev:;    ${COMPOSE_COMMAND} --file docker-compose.dev.yml up --build
logs:;   ${COMPOSE_COMMAND} $(@) --follow --tail="all"
prod:;   ${COMPOSE_COMMAND} up
rm:;     ${COMPOSE_COMMAND} down
rmi:;    ${COMPOSE_COMMAND} down --rmi local --remove-orphans
rmiv:;   ${COMPOSE_COMMAND} down --rmi local --volumes
start:;  ${COMPOSE_COMMAND} $(@)
stop:;   ${COMPOSE_COMMAND} $(@)
up:;     ${COMPOSE_COMMAND} up --detach

.PHONY: all
.PHONY: clean
.PHONY: dev
.PHONY: logs
.PHONY: prod
.PHONY: rm
.PHONY: rmi
.PHONY: rmiv
.PHONY: start
.PHONY: stop
.PHONY: up
