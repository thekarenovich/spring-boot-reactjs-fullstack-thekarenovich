package net.erik.springboot.controller;

import net.erik.springboot.model.People;
import net.erik.springboot.exception.ResourceNotFoundException;
import net.erik.springboot.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PeopleController {

    @Autowired
    private PeopleRepository peopleRepository;

    @GetMapping("/people")
    public List<People> getAllPeople() {
        return peopleRepository.findAll();
    }

    @PostMapping("/people")
    public People createPeople(@RequestBody People people) {
        return peopleRepository.save(people);
    }

    @GetMapping("/people/{id}")
    public ResponseEntity<People> getPeopleById(@PathVariable Long id) {
        People people = peopleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("People not exist with id :" + id));
        return ResponseEntity.ok(people);
    }

    @PutMapping("/people/{id}")
    public ResponseEntity<People> updatePeople(@PathVariable Long id, @RequestBody People peopleDetails) {
        People people = peopleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("People not exist with id :" + id));

        people.setFirstName(peopleDetails.getFirstName());
        people.setLastName(peopleDetails.getLastName());
        people.setEmailId(peopleDetails.getEmailId());

        People updatedPeople = peopleRepository.save(people);
        return ResponseEntity.ok(updatedPeople);
    }

    @DeleteMapping("/people/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePeople(@PathVariable Long id) {
        People people = peopleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("People not exist with id :" + id));

        peopleRepository.delete(people);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
