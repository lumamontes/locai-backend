const yup = require('yup');

const userSchema = yup.object({
  body: yup.object({
	user_type_id: yup.number(),                            
	name: yup.string().min(5).required(),                    
	email: yup.string().email().required(),                             
	telephone: yup.string(),                              
	birth_date: yup.date(),                              
	national_register: yup.string().nullable(),                           
	city: yup.string().nullable(),                              
	state: yup.string().nullable(),                              
	profile_picture: yup.string().url().nullable(),                              
	password: yup.string().min(8).required()     
  }),
});
module.exports = userSchema;