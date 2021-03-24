const db = require('../utils/database')

module.exports = class Product{
  constructor(id,title,imageUrl,description,price){
      this.id = id;
      this.title = title;
      this.price = price;
      this.description = description;
      this.imageUrl = imageUrl
  }

  save(){
      return db.execute(
        'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.imageUrl, this.description])
  }
  
  update(productId){
    return db.execute(
        `UPDATE products SET title = ?, price = ?,imageUrl = ?,description = ? WHERE products.id = ?`,
        [this.title, this.price, this.imageUrl, this.description, productId]
        )
  }

  static deleteById(id){
    return db.execute(`DELETE FROM products WHERE id = ?`,[id])
  }

  static fetchAll(){
      return  db.execute('SELECT * FROM products');
  } 

  static fetchProductById(Id){
      return db.execute(`SELECT * FROM products where products.id = ${Id}`)
  }

};

