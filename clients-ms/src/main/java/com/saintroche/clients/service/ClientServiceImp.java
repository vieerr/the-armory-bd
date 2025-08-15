package com.saintroche.clients.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.saintroche.clients.models.entities.Client;
import com.saintroche.clients.repositories.ClientRepository;

@Service
@Transactional
public class ClientServiceImp implements ClientService {

    private final ClientRepository clientRepository;

    public ClientServiceImp(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public List<Client> getAllClients() {
        return (List<Client>) clientRepository.findAll();
    }

    @Override
    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    @Override
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client updateClient(Long id, Client client) {
        Client existingClient = clientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Client with id " + id + " does not exist"));

        if (client.getFirstName() != null) {
            existingClient.setFirstName(client.getFirstName());
        }
        if (client.getLastName() != null) {
            existingClient.setLastName(client.getLastName());
        }
        if (client.getEmail() != null) {
            existingClient.setEmail(client.getEmail());
        }
        if (client.getActive() != null) {
            existingClient.setActive(client.getActive());
        }
        if (client.getRole() != null) {
            existingClient.setRole(client.getRole());
        }

        return clientRepository.save(existingClient);
    }

    @Override
    public void deleteClient(Long id) {
        if (!clientRepository.findById(id).isPresent()) {
            throw new IllegalArgumentException("Client with id " + id + " does not exist");
        }
        clientRepository.deactivateUser(id);
    }

    @Override
    public Optional<Client> getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    @Override
    public Optional<ClientRepository.ClientWithoutPassword> getCurrentClientFromToken(String token) {

        try {
            JwtService jwtService = new JwtService();
            String email = jwtService.getEmailFromToken(token);
            return clientRepository.findClientByEmailWithoutPassword(email);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<ClientRepository.ClientWithoutPassword> getClientByEmailWithoutPw(String email) {
        return clientRepository.findClientByEmailWithoutPassword(email);
    }

    // @Override
    // public List<Client> searchBy(String texto) {
    //     return clientRepository.searchBy(texto);
    // }
}
