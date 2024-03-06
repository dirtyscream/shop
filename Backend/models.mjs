import { Sequelize, Model } from 'sequelize'

export const sequelize = new Sequelize('postgres', 'danil', 'danman203', {
  host: 'localhost',
  dialect: 'postgres',
});

export class User extends Model { }

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Users',
  }
)

export class Company extends Model { }

Company.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Company',
  }
)

export class Category extends Model { }

Category.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Categories',
    timestamps: false,
  }
)

export class Product extends Model { }

Product.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    clicks: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  },
  {
    sequelize,
    modelName: 'Products',
    timestamps: true,
  }
)

Company.hasMany(Product, {
  onDelete: "cascade",
})
Category.hasMany(Product, {
  onDelete: "cascade"
})

export class Basket extends Model { }

Basket.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Baskets',
    timestamps: false,
  }
)

User.hasOne(Basket, {
  onDelete: "cascade",
})

Basket.hasMany(Product, {
  onDelete: "NO ACTION",
})

export class Comment extends Model { }

Comment.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Comments',
    timestamps: true,
  }
)

Comment.hasOne(User, {
  onDelete: "cascade",
})

Product.hasMany(Comment, {
  onDelete: "cascade",
})




