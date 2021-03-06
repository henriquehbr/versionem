import execa from 'execa'
import readPkg from 'read-pkg'

export const getRemoteUrl = async cwd => {
  const packageJson = await readPkg({ cwd, normalize: false })

  if (packageJson?.repository?.url) return packageJson.repository.url

  try {
    const params = ['config', '--get', 'remote.origin.url']
    const { stdout: remoteUrl } = await execa('git', params, { cwd })
    return remoteUrl
  } catch {
    return ''
  }
}
