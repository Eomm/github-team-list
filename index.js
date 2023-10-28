'use strict'

const readTeam = require('./lib/read-gh-team.js')

module.exports = async function getMdList (token, org, team) {
  const { toString } = await import('mdast-util-to-string')
  const teamNode = await readTeam(token, {
    org,
    teamSlug: team
  })

  const members = teamNode.organization.team.members.nodes

  const teamMd = members
    .map(toMdNode)
    .sort(alphabetical)

  return toString({
    type: 'list',
    ordered: false,
    spread: false,
    children: teamMd
  })
}

function toMdNode (member) {
  // https://github.com/syntax-tree/mdast#link
  return {
    type: 'listItem',
    spread: false,
    children: [{
      type: 'paragraph',
      children: [
        {
          type: 'link',
          url: member.avatarUrl,
          title: 'bravo',
          children: [
            {
              type: 'strong',
              children: [{ type: 'text', value: 'alpha' }]
            }
          ]
        }

      ]
    }]
  }
}

function alphabetical (a, b) {
  return 0// a.children[0].children[0].children[0].value.localeCompare(b.children[0].children[0].children[0].value)
}
