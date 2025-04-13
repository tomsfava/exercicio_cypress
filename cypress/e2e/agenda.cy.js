/// <reference types="cypress" />

describe('Testando funcionalidades da agenda de contatos', () => {
  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/')
    cy.get('.sc-beqWaB.eQdhbg.contato').its('length').as('qtde')
    cy.get('.sc-eDDNvR.cTVgex').first().find('li').first()
    .invoke('text').its('length').as('tmn')
  })

  it('Testa a inclusão de um contato', () => {
    cy.get('input[type="text"]').type('meuNome')
    cy.get('input[type="email"]').type('meuemail@test.com')
    cy.get('input[type="tel"]').type('11 975477172')
    cy.get('.adicionar').click()
    cy.get('@qtde').then((qtde) => {
      cy.get('.sc-beqWaB.eQdhbg.contato').should('have.length', qtde + 1)
    })
  })
  
  it('Testa a edição de um contato', () => {
    cy.get('.edit').first().click()
    cy.get('input[type="text"]').type('a')
    cy.get('.alterar').click()
    cy.get('@tmn').then((tmn) => {
      cy.get('.sc-eDDNvR.cTVgex').first().find('li').first()
      .invoke('text').should('have.length', tmn + 1)
    })
  })

  it('Testa a remoção de um contato', () => {
    cy.get('.delete').last().click()
    cy.get('@qtde').then((qtde) => {
      cy.get('.sc-beqWaB.eQdhbg.contato').should('have.length', qtde - 1)
    })
  })
})