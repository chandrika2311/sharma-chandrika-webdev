/**
 * Created by chandrika2311 on 3/21/17.
 */

var mongoose = require('mongoose');
var ProjectSchema = require('./project.schema.server');
var ProjectModel = mongoose.model('ProjectModel', ProjectSchema);



ProjectModel.createProject = createProject;
ProjectModel.findAllProjects = findAllProjects;
ProjectModel.removeProjectfromApplication = removeProjectfromApplication;
ProjectModel.addProjectToStudentWorking = addProjectToStudentWorking;
ProjectModel.findProjectById = findProjectById;
ProjectModel.updateProject = updateProject;
ProjectModel.deleteProject = deleteProject;

ProjectModel.addStudentApplication = addStudentApplication;
ProjectModel.setModel = setModel;


function createProject(userId, project) {
    new_project = {
                    Title: project.Title,
                    Description: project.Description,
                    ConceptsInvolved: project.ConceptsInvolved,
                    Skillset: project.Skillset,
                    BasicRequirements: project.BasicRequirements,
                    CourseRequirements:project.CourseRequirements
    };

    return ProjectModel
        .create(new_project)
        .then(
            function(project_created){
                console.log("project Created ", project_created);


                return model.UserModel.findUserById(userId)
                    .then(function (user) {

                        project_created._Mentor = (user._id);
                        project_created.save();

                        user.projects.push(project_created._id);
                        user.save();

                        return project_created;

                    },function (err) {

                        return err;
                    })
            },
            function(err){
                console.log("user err" + err);
                return err;
            });

}
function deleteProject(projectId) {

    return ProjectModel.remove({id:projectId});


}
function findProjectById(projectId) {
    return ProjectModel.findOne({_id: projectId});
}
function updateProject(projectId, project) {

    return ProjectModel.update({_id : projectId},
        {
            Title: project.Title,
            Description: project.Description,
            ConceptsInvolved: project.ConceptsInvolved,
            Skillset: project.Skillset,
            BasicRequirements: project.BasicRequirements
        });
}
function setModel(_model) {
    model = _model;
}
function findAllProjects() {
    return ProjectModel.find();

}
function addStudentApplication(studentId, projectId) {
    console.log('addStudentApplication',projectId);

    return ProjectModel.findProjectById(projectId)
        .then(function (project_found) {
            console.log("outside",project_found);
            return model.UserModel.findUserById(studentId)
                .then(function (student) {
                    project_found.Applications.push(studentId);
                    project_found.save();
                    student.ProjectApplications.push(projectId);
                    student.save();
                    console.log(student);
                    console.log(project_found);
                },function (error) {
                    console.log(error);
                    return error;

                })
        },function (error) {
            console.log(error);
            return error;

        })
}
function addProjectToStudentWorking(projectId,studentId) {
    console.log("inside addProjectToStudentWorking");
    return ProjectModel.findProjectById(projectId)
        .then(function (project) {
            return model.UserModel.findUserById(studentId)
                .then(function (student) {

                    project.StudentWorking.push(student);
                    var applications = project.Applications;
                    // console.log("applications",applications);
                    var index = applications.indexOf(studentId);

                    if (index > -1){
                        applications.splice(index,1);
                    }

                    project.Applications = applications;

                    console.log("student save",student);

                    //Student:
                    var application_student = student.ProjectApplications;

                    var index_s = application_student.indexOf(projectId);

                    console.log("index_s :",index_s);
                    if (index_s > -1){
                        application_student.splice(index_s,1);
                    }

                    student.ProjectApplications = application_student;
                    console.log("application student",student.ProjectApplications);
                    student.projects.push(project);
                    student.save();
                    project.save();
                    console.log("project after save",project);
                    console.log("student after save",student);
                })

        })

}
function removeProjectfromApplication(projectId,studentId) {
    return ProjectModel.findProjectById(projectId)
        .then(function (project) {
            return model.UserModel.findUserById(studentId)
                .then(function (student) {

                    var applications = project.Applications;
                    // console.log("applications",applications);
                    var index = applications.indexOf(studentId);

                    if (index > -1) {
                        applications.splice(index, 1);
                    }
                    project.Applications = applications;


                    //Student:
                    var application_student = student.ProjectApplications;
                    var index_s = applications.indexOf(projectId);

                    if (index_s > -1) {
                        application_student.splice(index_s, 1);
                    }

                    student.ProjectApplications = application_student;
                    console.log("application student", student.ProjectApplications);

                    student.save();
                    project.save();
                    console.log("project after save", project);
                    console.log("student after save", student);
                })
        })
}

module.exports = ProjectModel;


