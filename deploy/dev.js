#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const chalk = require('chalk')
const YAML = require('yaml')
const path = require('path')
const ncp = require('ncp').ncp

const spawn = require('cross-spawn')

const creat = {
    data: {
        codePath: process.cwd(),
        projectList: [],
        project: null,
    },
    init: async function() {
        await this.getEnvs()
        const projectName = process.argv[2]
        console.log(process.argv)
        if (projectName) {
            this.data.project = this.searchProject(projectName)
            if(!this.data.project){
                throw new Error('传入的项目不存在，请重新输入')
            }
            this.start(true)
        } else {
            await this.questions()
            this.start()
        }
    },
    getEnvs: async function() {
        let envs = fs.readdirSync(`${this.data.codePath}/config/env`)
        for (const name of envs) {
            let env = YAML.parse(
                fs.readFileSync(
                    `${this.data.codePath}/config/env/${name}`,
                    'utf8'
                )
            )
            this.data.projectList.push(env)
        }
    },
    searchProject(name) {
        return this.data.projectList.find((item)=>{
            return item.project === name
        })
    },
    questions: async function() {
        let choices = this.data.projectList.map((env, index) => {
            return { name: env.name, value: index }
        })
        const { index } = await inquirer.prompt([
            {
                name: 'index',
                type: 'list',
                message: chalk.blue('请选择需要膜拜的大佬!'),
                choices,
            },
        ])
        this.data.project = this.data.projectList[index]
    },
    start: async function(confirm) {
        let {project} = this.data;
        this.creatEnvJson();
        this.creatConfigJs();
        let env = {
            ...process.env,
            VUE_APP_PROJECT: project.project,
            VUE_APP_PROJECT_ENV: JSON.stringify(project)
        };

        if(!confirm){
            console.log({
                项目名称: project.project,
                环境配置: project
            });
            let { configAnswers } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'configAnswers',
                    message: chalk.red('请确认配置是否正确'),
                    default: true
                }
            ]);
            if (!configAnswers) {
                console.log(chalk.red('退出'));
                process.exit();
            }

            console.log(process.env.NODE_ENV)

            spawn('npm', ['run', process.env.NODE_ENV === 'development' ? 'start' : 'build:prod'], {
                stdio: 'inherit',
                env
            });
        }
    },
    creatEnvJson: function(){
        let projectList = {};
        this.data.projectList.map((item) =>{
            const key = item.project;
            projectList[key] = item
        })
        fs.writeFileSync(`${this.data.codePath}/src/config/dev-env.json`,JSON.stringify(this.data.project, null, 2))
        fs.writeFileSync(`${this.data.codePath}/src/config/projectList.json`,JSON.stringify(projectList, null, 2))
    },
    creatConfigJs: function() {
        let { function: appFunction } = YAML.parse(fs.readFileSync(`${this.data.codePath}/config/app.yaml`,'utf8'))
        let data = {
            project: {},
            functionList: appFunction
        };
        this.data.projectList.map((item)=>{
            data.project[item.host] = item.project;
        })
        let str = JSON.stringify(data,null,2)
        fs.writeFileSync(`${this.data.codePath}/src/config/.config.json`,str)
    },

}

creat.init()
