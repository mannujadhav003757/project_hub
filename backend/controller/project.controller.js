const Project = require('../model/project.schema')
const mongoose = require('mongoose')

exports.createProject = async (req, res) => {
    try {
        const tempProject = req.body

        if (!tempProject) {
            return res.status(400).send({
                'message': 'unable to add project, please try again',
                'statusCode': 400
            })
        }


        const project = new Project(tempProject)

        await project.save()

        return res.status(201).send({
            'message': 'product added successfully',
            'statusCode': 201
        })

    } catch (e) {
        return res.status(400).send({
            'message': 'something went wrong, please try again.',
            'statusCode': 400
        })
    }
}


exports.getAllProject = async (req, res) => {
    
    const  project =await Project.find()
    if(!project)
    {
        return res.status(400).send({
                'message': 'record not found',
                 'statusCode': 400 
        })
    }
    else{
        return res.status(200).send({
                    'message': 'ok',
                    'statusCode': 200,
                     'data': project
                        
        })
    }

}

exports.deleteProject = async (req,res) =>{
    try {
        const _id = req.body
        if(_id)
        {
        const project = await Project.findOneAndRemove({ _id }).lean()
        return res.status(200).send({
            'message': 'record deleted successfully',
             'statusCode': 200 ,
             'data':project
            })
        }
        else{
            return res.status(400).send({
                'message': 'record not found',
                 'statusCode': 400 
            })
        }
}
catch(e)
{
     return res.status(400).send({
            'message': 'something went wrong, please try again.',
            'statusCode': 400
        })

}
}

 exports.updateProject = async (req,res) =>{
    try{
        const _id = req.params.id

        if(!_id) {
            return res.status(400).send({
                'message':"Project not found, please try again",
                'statusCode': 400
             })
        }

      const tempProject = await Project.findByIdAndUpdate(_id, { $set: req.body }, { new: true })

        if (!tempProject) {
           return res.status(400).send({
              'message':"Project not found, please try again",
              'statusCode': 400
           })
        }
        return res.status(200).send({
            'message': "Project updated successfully",
            'statusCode': 200
        })     
    }
    catch (e){
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
    })
}

 }
