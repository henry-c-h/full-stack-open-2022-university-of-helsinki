describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user1 = {
      username: 'root',
      password: 'root',
      name: 'root',
    };
    const user2 = {
      username: 'john',
      password: 'john',
      name: 'john',
    };
    cy.createUser(user1);
    cy.createUser(user2);
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('root');
      cy.get('#login-btn').click();
      cy.contains('root logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('abcd');
      cy.get('#login-btn').click();
      cy.contains('Wrong username or password');
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 69, 0)');
      cy.get('html').should('not.contain', 'root logged in');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'root' });
    });

    it('a blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('test title');
      cy.get('#author').type('test author');
      cy.get('#url').type('test url');
      cy.get('#create-btn').click();
      cy.contains('test title test author');
      cy.get('.blog-item').should('have.length', 1);
    });

    describe('and some blogs exist', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'first title by root',
          author: 'first author by root',
          url: 'first url by root',
        });
        cy.addBlog({
          title: 'second title by root',
          author: 'second author by root',
          url: 'second url by root',
        });
        cy.addBlog({
          title: 'third title by root',
          author: 'third author by root',
          url: 'third url by root',
        });
        cy.contains('logout').click();
        cy.login({ username: 'john', password: 'john' });
        cy.addBlog({
          title: 'first title by john',
          author: 'first author by john',
          url: 'first url by john',
        });
      });

      it('one of those can be liked', function () {
        cy.contains('second title by root second author by root')
          .parent()
          .as('blogItem');
        cy.get('@blogItem').find('.view-btn').click();
        cy.get('@blogItem').find('.like-btn').click();
        cy.get('@blogItem').should('contain', 'likes: 1');
      });

      it('one of those can be deleted by its creator', function () {
        cy.contains('first title by john first author by john')
          .parent()
          .as('blogItem');
        cy.get('@blogItem').find('.view-btn').click();
        cy.get('@blogItem').find('.remove-btn').click();
        cy.get('.blog-item').should('have.length', 3);
        cy.contains('first title by john first author by john').should(
          'not.exist',
        );
      });

      it('a blog cannot be deleted by users other than its creator', function () {
        cy.contains('first title by root first author by root')
          .parent()
          .as('blogItem');
        cy.get('@blogItem').find('.view-btn').click();
        cy.get('@blogItem').find('.remove-btn').should('not.exist');
      });

      describe('and are liked multiple times', function () {
        beforeEach(function () {
          cy.contains('third title by root third author by root')
            .parent()
            .as('blogItem1');
          cy.contains('first title by john first author by john')
            .parent()
            .as('blogItem2');
          cy.get('@blogItem1').find('.view-btn').click();
          cy.get('@blogItem1').find('.like-btn').click();

          cy.get('@blogItem2').find('.view-btn').click();
          cy.get('@blogItem2').find('.like-btn').click();
          cy.get('@blogItem2').find('.like-btn').click();

          cy.wait(1000);
        });

        it('blogs are ordered according to likes in descending order', function () {
          cy.get('.blog-item')
            .eq(0)
            .should('contain', 'first title by john first author by john');
          cy.get('.blog-item')
            .eq(1)
            .should('contain', 'third title by root third author by root');
        });
      });
    });
  });
});
