/**
 * Created by chandrika2311 on 4/15/17.
 */
module.exports = function (app, ProjectModel) {
    app.post('/api/project/working/:projectId',addProjectToStudentWorking);
    app.get('/api/project/:projectId', findProjectById);
    app.get('/api/allProjects',findAllProjects);
    app.post('/api/project/reject', removeProjectfromApplication);
    app.post('/api/project/application/:projectId',addStudentApplication);
    app.put('/api/project/:projectId', updateProject);
    app.delete('/api/project/:projectId', deleteProject);
    app.post('/api/mentor/:userId/project', createProject);

    function createProject(req,res) {

        var userId = req.params.userId;
        var project = req.body;
        console.log(project);

         ProjectModel
            .createProject(userId, project)
            .then(function(newProject) {
                res.json(newProject);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function findAllProjects(req,res) {
        ProjectModel.findAllProjects()
            .then(function(projects) {
                res.json(projects);
            }, function (error) {
                console.log(error);
                res.sendStatus(400).send(error);
            });

    }
    function findProjectById(req,res) {
        var projectId = req.params.projectId;

        ProjectModel
            .findProjectById(projectId)
            .then(function(project_now) {

                res.json(project_now);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function updateProject(req,res) {
        var projectId = req.params.projectId;
        var project = req.body;
        ProjectModel
            .updateProject(projectId, project)
            .then(function(project_got) {
                res.json(project_got);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
        
    }
    function deleteProject(req,res) {
        var projectId = req.params.projectId;
        var project = req.body;

        ProjectModel.deleteProject(projectId)
            .then(function (response) {
                res.send(response);

            },function (err) {
                console.log(err);

            })
    }
    function addStudentApplication(req,res) {
        console.log('server addStudentApplication');
        var student = req.body;//only contains student id in JSON format
        studentId = student._id;


        var projectId =  req.params.projectId;
        ProjectModel
            .addStudentApplication(studentId,projectId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.sendStatus(400).send(error);
                });

    }
    function addProjectToStudentWorking(req,res) {
        var student = req.body;
        studentId = student._id;
        var projectId =  req.params.projectId;
        ProjectModel.addProjectToStudentWorking(projectId,studentId)
            .then(function (response) {
                res.json(response);

            },function (err) {
                res.sendStatus(400).send(error);
            });
    }
    function removeProjectfromApplication(req,res) {
        var student = req.body;
        studentId = student._id;
        var projectId =  req.params.projectId;
        ProjectModel.removeProjectfromApplication(projectId,studentId)
            .then(function (response) {
                res.json(response);

            },function (err) {
                res.sendStatus(400).send(error);
            });


    }
};
