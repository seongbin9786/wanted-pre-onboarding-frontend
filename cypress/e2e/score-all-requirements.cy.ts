describe('전체 요구사항 확인', () => {
  const GOOD_ID = 'hello@world';
  const GOOD_PW = '12345678';
  const BAD_ID = 'helloworld';
  const BAD_PW = '1234';
  const TEMP_ID = `${Cypress._.random(0, 1e6)}@`;
  const TEMP_PW = `${Cypress._.random(0, 1e10)}`;

  const TEMP_TODO_NAME = `todo-${Cypress._.random(0, 1e10)}`;
  const TEMP_TODO_NEW_NAME = `todo-${Cypress._.random(0, 1e10)}`;

  it('메인 화면 방문 성공', () => {
    cy.visit('http://localhost:3000');
  });
  it('회원가입 및 리다이렉션 성공', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('[data-testid=email-input]').type(TEMP_ID);
    cy.get('[data-testid=password-input]').type(TEMP_PW);
    cy.get('[data-testid=signup-button]').click();
    cy.url().should('eq', 'http://localhost:3000/signin');
  });
  it('회원가입 불가 1 - 이메일 조건 불만족', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('[data-testid=email-input]').type(BAD_ID);
    cy.get('[data-testid=password-input]').type(GOOD_PW);
    cy.get('[data-testid=signup-button]').should('be.disabled');
  });
  it('회원가입 불가 2 - 비밀번호 조건 불만족', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('[data-testid=email-input]').type(GOOD_ID);
    cy.get('[data-testid=password-input]').type(BAD_PW);
    cy.get('[data-testid=signup-button]').should('be.disabled');
  });
  it('로그인 불가 1 - 이메일 조건 불만족', () => {
    cy.visit('http://localhost:3000/signin');
    cy.get('[data-testid=email-input]').type(BAD_ID);
    cy.get('[data-testid=password-input]').type(GOOD_PW);
    cy.get('[data-testid=signin-button]').should('be.disabled');
  });
  it('로그인 불가 2 - 비밀번호 조건 불만족', () => {
    cy.visit('http://localhost:3000/signin');
    cy.get('[data-testid=email-input]').type(GOOD_ID);
    cy.get('[data-testid=password-input]').type(BAD_PW);
    cy.get('[data-testid=signin-button]').should('be.disabled');
  });
  it('로그인 화면 방문 성공 및 로그인 성공', () => {
    cy.visit('http://localhost:3000/signin');
    cy.get('[data-testid=email-input]').type(TEMP_ID);
    cy.get('[data-testid=password-input]').type(TEMP_PW);
    cy.get('[data-testid=signin-button]').click();
    cy.url().should('eq', 'http://localhost:3000/todo');
  });
  it('로그인 이후 Todo 생성-수정-삭제', () => {
    cy.visit('http://localhost:3000/signin');
    cy.get('[data-testid=email-input]').type(TEMP_ID);
    cy.get('[data-testid=password-input]').type(TEMP_PW);
    cy.get('[data-testid=signin-button]').click();
    cy.url().should('eq', 'http://localhost:3000/todo');

    // Todo 생성
    cy.get('[data-testid=new-todo-input]').type(TEMP_TODO_NAME);
    cy.get('[data-testid=new-todo-add-button]').click();
    cy.wait(1000);
    cy.get('li > label > span')
      .filter((idx, elem) => elem.textContent === TEMP_TODO_NAME)
      .its('length')
      .should('eq', 1);

    // Todo 수정
    cy.get('[data-testid=modify-button]').click();
    cy.get('[data-testid=modify-input]').focus().clear();
    cy.get('[data-testid=modify-input]').type(TEMP_TODO_NEW_NAME);
    cy.get('[data-testid=submit-button]').click();
    cy.wait(1000);
    cy.get('li > label > span')
      .filter((_, elem) => elem.textContent === TEMP_TODO_NEW_NAME)
      .its('length')
      .should('eq', 1);

    // Todo 삭제
    cy.get('[data-testid=delete-button]').click();
    cy.wait(1000);
    cy.get('li > label > span').should('not.exist');
  });
});
