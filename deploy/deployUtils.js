#!/usr/bin/env node
'use strict'

/*
 * Git remotes should be setup as follows:
 *  - heroku-dev: masorx3-dev
 *  - heroku-test: masorx3-test
 *  - heroku-uat: masorx3-uat
 *
 *  heroku toolbelt cli (https://toolbelt.heroku.com/) must be installed and an
 *  account with developer permissions over masorx3 should be logged in (See
 *  https://devcenter.heroku.com/articles/heroku-command)
 */

require('shelljs/global')
var fs = require('fs')
var backup = require('backup')
var _ = require('underscore')

var erbOutputFile = './config/nginx.conf.erb'
var erbTemplate = erbOutputFile + '.template'

exports.deployToHeroku = function (env) {
  var tempBranchName = 'deploy/' + env + Math.random().toString()
  exec('git checkout -b ' + tempBranchName)
  exec('git add -f dist/')
  exec('git commit -m "Added dist"')
  exec('git push heroku-' + env + ' +HEAD:master')
  backup.restore(erbTemplate + '.backup', erbTemplate)

  exec('git checkout develop')
  exec('git branch -D ' + tempBranchName)
}
