package com.saintroche.clients.service;

import java.security.Key;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
public class JwtService {

    @Value("${super-secret-key}") // Inject from application.properties
    private String secret;

    private Key secretKey;

    @PostConstruct
    public void init() {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    private Key getSignInKey() {
        return secretKey;
    }

    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /** Parse the userInfo string from the token into a map */
    private Map<String, String> parseUserInfo(String userInfo) {
        Map<String, String> map = new HashMap<>();
        // userInfo format: {id=1, firstName=Olivier, lastName=Paspuel, email=..., role=client, ...}
        userInfo = userInfo.replaceAll("[{}]", ""); // remove braces
        String[] entries = userInfo.split(",\\s*");
        for (String entry : entries) {
            String[] kv = entry.split("=", 2);
            if (kv.length == 2) {
                map.put(kv[0].trim(), kv[1].trim());
            }
        }
        return map;
    }

    /** Get email from token by parsing userInfo */
    public String getEmailFromToken(String token) {
        Claims claims = getAllClaims(token);
        String userInfoStr = claims.get("userInfo", String.class);
        if (userInfoStr == null) {
            throw new IllegalStateException("userInfo claim missing in token");
        }
        Map<String, String> userInfo = parseUserInfo(userInfoStr);
        return userInfo.get("email");
    }

    /** Optional: get the full user info as a map */
    public Map<String, String> getUserInfoFromToken(String token) {
        Claims claims = getAllClaims(token);
        String userInfoStr = claims.get("userInfo", String.class);
        if (userInfoStr == null) return null;
        Map<String, String> userInfo = parseUserInfo(userInfoStr);
        userInfo.remove("password");
        return userInfo;
    }
}
