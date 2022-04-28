const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

db.authenticate().then(() => {
    console.log('Connected to the database');
})

function generateSlug (title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const User = db.define("user", {
    name: {
        type:Sequelize.STRING,
        allowNull: false
    },
    email: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

const Page = db.define('page', {
    title: {
        type:Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type:Sequelize.STRING,
        allowNull: false
    },
    content: {
        type:Sequelize.TEXT,
        allowNull: false,
    },
    status: Sequelize.ENUM('open','closed')
})

Page.beforeValidate((page) => {
    page.slug = generateSlug(page.title);
});

module.exports = {db,Page, User};