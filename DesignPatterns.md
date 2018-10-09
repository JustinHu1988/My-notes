Design patterns are proven solutions to common development problems and can suggest structural paradigms to help guide us in adding some organization to our application.



## MVC

Model-View-Controller:

- an architectural design pattern that encourages improved application organization through a *separation of concerns*. 
- It enforces the isolation of business data (Models) from user interfaces (Views), with a third component (Controllers) (traditionally) managing logic, user-input and coordinating both the models and views. 
- 中心思想： *解耦*，尽可能解除V和M之间的耦合，因此易于复用M，以及修改V的需求（V需求变动频繁）
- *Observer pattern*: for updating the View whenever the Model changed (nowadays commonly implemented as a *Publish/Subscribe system*)
  - A simple example of this is an application backed by stock market data - in order for the application to be useful, any change to the data in our Models should result in the View being refreshed instantly. 



### MVC for JavaScript Developers

#### Models

*Models* manage the data for an application.

- They are concerned with neither the user-interface nor presentation layers but instead *represent unique forms of data that an application may require*.
- When a model changes, it will typically notify its observers (views) that a change has occurred so that they may react accordingly.



#### Views

*Views are a visual representation of models that present a filtered view of their current state.*

- A view typically *observes a model and is notified when the model changes*, allowing the view to update itself accordingly.
- Design pattern literature commonly refers to views as 'dumb' given that their knowledge of models and controllers in an application is limited. 

Users are able to interact with views and this includes the ability to read and edit (i.e get or set the attribute values in) models. 

- As the view is the presentation layer, we generally present the ability to edit and update in a user-friendly fashion. 

*The actual task of updating the model falls to controllers.*



#### Controllers

Controllers are an intermediary between models and views which are classically responsible for two tasks:

- update the view when the model changes
- update the model when the user manipulates the view



### **What does MVC give us?**

This separation of concerns in MVC facilitates simpler modularization of an application's functionality and enables:

- Easier overall maintenance. 
  - When updates need to be made to the application it is very clear whether the changes are data-centric (meaning changes to models and possibly controllers) or merely visual (meaning changes to views).
- Decoupling models and views means that it is significantly more straight-forward to write unit tests for business logic.
- Duplication of low-level model and controller code is eliminated across the application.
- Depending on the size of the application and separation of roles, this modularity allows developers responsible for core logic and developer working on the user-interfaces to work simultaneously.



#### Delving deeper

As we've discussed, models represent application data whilst views are what the user is presented on screen.

- As such, MVC relies on Pub/Sub for some of its core communication.
- When a model is changed it notifies the rest of the application it has been updated. The controller then updates the view accordingly. The observer nature of this relationship is what facilitates multiple views being attached to the same model. 





## MVP

Model-view-presenter (MVP):

- a derivative of the MVC design pattern which *focuses on improving presentation logic*.



### Models, Views & Presenters

Presenter is a component which contains the user-interface business logic for the view.

- Unlike MVC, invocations from the view are delegated to the presenter, which are decoupled from the view and instead talk to it through an interface.
  - This allows for all kinds of useful things such as being able to mock views in unit tests.

The most common implementation of MVP is one which uses a Passive View (a view which is for all intents and purposes "dumb"), containing little to no logic. 

- MVP models are almost identical to MVC models and handle application data. 
- The presenter acts as a mediator which talks to both the view and model, however both of these are isolated from each other. They effectively bind models to views, a responsibility which was previously held by controllers in MVC. 
- Presenters are at the heart of the MVP pattern and as you can guess, incorporate the presentation logic behind views. 

Solicited by a view, presenters perform any work to do with user requests and pass data back to them. In this respect, they retrieve data, manipulate it and determine how the data should be displayed in the view. 

- In some implementations, the presenter also interacts with a service layer to persist data (models). Models may trigger events but it's the presenters role to subscribe to them so that it can update the view. In this passive architecture, we have no concept of direct data binding. Views expose setters which presenters can use to set data.



The benefit of this change from MVC is that:

- *it increases the testability of your application and provides a more clean separation between the view and the model.*
- This isn't however without its costs as the lack of data binding support in the pattern can often mean having to take care of this task separately. 





> 后续阅读：
>
> https://martinfowler.com/eaaDev/uiArchs.html
>
> 

