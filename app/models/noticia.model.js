module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        content: String,
        dt_published: Date
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Noticia = mongoose.model("noticia", schema);
    return Noticia;
  };