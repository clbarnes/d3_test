#!/usr/bin/env python
from selenium import webdriver
from sys import stdout
import os

DIR = os.path.dirname(os.path.abspath(__file__))

driver = webdriver.PhantomJS(service_log_path=os.path.join(DIR, 'phantom.log'))
driver.set_window_size(1024, 768)
driver.get('http://localhost:8080/')
driver.save_screenshot(
    os.path.join(DIR, 'snapshot.png')
)
