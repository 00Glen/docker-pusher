# Docker pusher

A simple docker push util to generate the docker image and push it, also it allows you to version your git project (package.json), commit, tag and push to origin.

## How to use it

#### 1. Install the it as dev dependency:

```bash
  npm i --save-dev docker-pusher
```

#### 2 Run docker-pusher

In your terminal run:

```bash
  docker-pusher --imageName "my-docker-image"
```

You can pass the next arguments:

- `imageName`(required): The docker image name
- `branchName`: The branch name that the git version is allowed, you can use RegEx, if it's empty it will allow all the branches
  - Default: `""`
- `commitSubjectTemplate`: The git commit subject template to use when commit the new version, you can use [mustache string template](https://github.com/janl/mustache.js#templates), the parameter to render the string is `version`
  - Default: `chore(repo): update to v{{version}}`
- `skipGit`: Boolean, skips the git new version (package.json), git tag, git commit and git push
  - Default: `false`
- `beta`: Boolean, if `true` the new version will be considered as a pre-release version: `x.y.z-beta.n`, if `false` the new version will be considered as a patch version
  - Default: `false`
  - Alias: `b` (`-b`)
- `version`: The specific new version using the Semantic Versioning Specification (SemVer) https://semver.org/`
  - Default: It will read the `package.json` version and increase by 1 the patch version or the pre-release version if the `--beta` argument is `true`

#### 3. Optionally you can create a `docker-pusher-config.json`:

If your prefer to set default arguments, you can create a `docker-pusher-config.json` file in your root project with the arguments as properties, example:

```json
{
  "imageName": "my-docker-image",
  "commitSubjectTemplate": "chore(tag): Release v{{version}} version!",
  "branchName": "main"
}
```

**Remember**: if you run `docker-pusher` with some of those `docker-pusher-config.json` properties as arguments, the `docker-pusher-config.json` property value will be ignored.
