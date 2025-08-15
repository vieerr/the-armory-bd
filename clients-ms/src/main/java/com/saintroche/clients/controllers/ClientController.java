package com.saintroche.clients.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saintroche.clients.models.dto.ClientDto;
import com.saintroche.clients.models.entities.Client;
import com.saintroche.clients.service.ClientService;
import com.saintroche.clients.service.JwtService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;

    private final JwtService jwtService;

    public ClientController(ClientService clientService, JwtService jwtService) {
        this.clientService = clientService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/me")
    @CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
    public ResponseEntity<?> getCurrentClient(@CookieValue(name = "the-armory-jwt", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No token found");
        }

        try {
            // Get user info from token
            Map<String, String> tokenUserInfo = jwtService.getUserInfoFromToken(token);
            if (tokenUserInfo == null || tokenUserInfo.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token: userInfo missing");
            }

            String email = tokenUserInfo.get("email");

            // Try to fetch user from DB
            return clientService.getClientByEmail(email)
                    .map(client -> new ClientDto(
                    client.getId(),
                    client.getFirstName(),
                    client.getLastName(),
                    client.getEmail(),
                    client.getRole(),
                    client.getActive() // adjust according to your entity
            ))
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> {
                        // fallback: build ClientDto from token info
                        return ResponseEntity.ok(new ClientDto(
                                Long.valueOf(tokenUserInfo.get("id")), // convert string to Long
                                tokenUserInfo.get("firstName"),
                                tokenUserInfo.get("lastName"),
                                tokenUserInfo.get("email"),
                                tokenUserInfo.get("role"),
                                Boolean.valueOf(tokenUserInfo.get("active")) // convert string to boolean
                        ));
                    });

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClientById(@PathVariable Long id) {
        return clientService.getClientById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getClientByEmail(@PathVariable String email) {
        return clientService.getClientByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/hq-email/{email}")
    public ResponseEntity<?> getHomieQuanByEmail(@PathVariable String email) {
        return clientService.getClientByEmailWithoutPw(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createClient(@Valid @RequestBody Client client) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(clientService.createClient(client));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateClient(@Valid @PathVariable Long id, @RequestBody Client client) {
        try {
            return ResponseEntity.ok(clientService.updateClient(id, client));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }

    // this is how particular methods can be added later
    // @GetMapping("/buscar")
    // public ResponseEntity<?> searchClients(@RequestParam String texto) {
    //     List<Client> clients = clientService.searchBy(texto);
    //     if (clients.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró nada con ese nombre o descripción :( .");
    //     }
    //     return ResponseEntity.ok(clients);
// }
}
