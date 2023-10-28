'use strict'

const { graphql } = require('@octokit/graphql')

module.exports = async function readTeam (authToken, { org, teamSlug }) {
  const query = `
  query GetTeamMembers($org: String!, $teamSlug: String!) {
    organization(login: $org) {
      team(slug: $teamSlug) {
        name
        members(first: 100) {
          nodes {
            login
            name
            avatarUrl
            socialAccounts(first: 10) {
              nodes {
                url
                displayName
              }
            }
          }
        }
      }
    }
  }
`

  const res = await graphql(query, {
    org,
    teamSlug,
    headers: {
      authorization: `token ${authToken}`
    }
  })

  return res
}
