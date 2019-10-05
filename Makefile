COUNTER_DIR=counter
CALORIES_COUNTER_DIR=calories-counter
UNIT_CONVERTER_DIR=unit-converter

build: build-counter build-calories-counter build-unit-converter
build-counter:
	@echo ">>>> Building Counter <<<<"
	cd $(COUNTER_DIR) && npm run build && cd -

build-calories-counter:
	@echo ">>>> Building Calories Counter <<<<"
	cd $(CALORIES_COUNTER_DIR) && npm run build && cd -

build-unit-converter:
	@echo ">>>> Building Unit Converter <<<<"
	cd $(UNIT_CONVERTER_DIR) && npm run build && cd -

deploy: deploy-counter deploy-calories-counter deploy-unit-converter
deploy-counter:
	@echo ">>>> Deploying Counter <<<<"
	cd $(COUNTER_DIR) && netlify deploy --dir=dist && cd -

deploy-calories-counter:
	@echo ">>>> Deploying Calories Counter <<<<"
	cd $(CALORIES_COUNTER_DIR) && netlify deploy --dir=dist && cd -

deploy-unit-converter:
	@echo ">>>> Deploying Unit Converter <<<<"
	cd $(UNIT_CONVERTER_DIR) && netlify deploy --dir=dist && cd -

deploy-prod: deploy-prod-counter deploy-prod-calories-counter deploy-prod-unit-converter
deploy-prod-counter:
	@echo ">>>> Deploying Counter <<<<"
	cd $(COUNTER_DIR) && netlify deploy --prod --dir=dist && cd -

deploy-prod-calories-counter:
	@echo ">>>> Deploying Calories Counter <<<<"
	cd $(CALORIES_COUNTER_DIR) && netlify deploy --prod --dir=dist && cd -

deploy-prod-unit-converter:
	@echo ">>>> Deploying Unit Converter <<<<"
	cd $(UNIT_CONVERTER_DIR) && netlify deploy --prod --dir=dist && cd -
