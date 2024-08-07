
    module.exports = function (app) {
        const modelName = 'protocol';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            protocol: { type: Schema.Types.ObjectId, ref: "settings" },
host: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false, default: '' },
port: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
user: { type: String, required: false, unique: false, lowercase: false, uppercase: false, minLength: 2, maxLength: 150, index: true, trim: true },
password: { type: String, required: false, unique: false, lowercase: false, uppercase: false, minLength: 2, maxLength: 150, index: true, trim: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };