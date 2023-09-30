#!/bin/bash
comm -23 <(find dist -name  '*.pdf' | cut -d"." -f1 | sort) <(find dist -name  '*.tex' | cut -d"." -f1 | sort)
