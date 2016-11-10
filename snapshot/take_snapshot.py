#!/usr/bin/env python
from selenium import webdriver
from sys import stdout, argv
import os
import json
import warnings


DIR = os.path.dirname(os.path.abspath(__file__))


class JavascriptError(Exception):
    pass


class JavascriptWarning(Warning):
    pass


driver = webdriver.PhantomJS(service_log_path=os.path.join(DIR, 'phantom.log'))
driver.set_window_size(1024, 768)
driver.get(os.path.join(os.path.dirname(DIR), 'index.html'))

driver.save_screenshot(os.path.join(DIR, 'snapshot.png'))


if len(argv) > 1 and argv[1] == "test":
    log = driver.get_log("har")
    print(json.dumps(log, sort_keys=True, indent=2))
    for item in log:
        if item['level'] == 'WARNING':
            warnings.warn(item['message'], JavascriptWarning)
        elif item['level'] not in ['INFO', 'DEBUG']:
            raise JavascriptError(item['message'])
else:
    driver.save_screenshot(os.path.join(DIR, 'snapshot.png'))
