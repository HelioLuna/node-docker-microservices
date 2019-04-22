'use strict'

const Docker = require('dockerode')

const discoverRoutes = (container) => {
  return new Promise((resolve, reject) => {
    const dockerSettings = container.resolve('dockerSettings')

    const docker = new Docker(dockerSettings)

    const avoidContainers = (name) => {
      if (/api/.test(name)) {
        return true
      }
      return false
    }

    const addRoute = (routes, details) => {
      routes[details.Id] = {
        id: details.Id,
        name: details.Names[0].split('').splice(1).join(''),
        route: '/' + details.Labels.apiRoute.split('/').splice(3),
        target: getUpstreamUrl(details)
      }
    }

    const getUpstreamUrl = (containerDetails) => {
      const { PublicPort } = containerDetails.Ports[0]
      return `http://${dockerSettings.host}:${PublicPort}`
    }

    docker.listContainers((err, containers) => {
      if (err) {
        reject(new Error('an error occured listing containers, err: ' + err))
      }

      const routes = new Proxy({}, {
        get(target, key) {
          console.log(`get properties from -> "${key}" container`)
          return Reflect.get(target, key)
        },
        set(target, key, value) {
          console.log('Setting properties', key, value)
          return Reflect.set(target, key, value)
        }
      })

      containers.forEach((containerInfo) => {
        if (!avoidContainers(containerInfo.Names[0])) {
          addRoute(routes, containerInfo)
        }
      })

      resolve(routes)
    })
  })
}

module.exports = Object.assign({}, { discoverRoutes })