package com.thuthao.beta.config;

import com.thuthao.beta.service.AccountDetailsImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtToken implements Serializable {
    private static final long serialVersionUID = -2550185165626007488L;

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private long jwtExpiration;


    public String getUsernameFromToken(String token) {

        return getClaimFromToken(token, Claims::getSubject);

    }


    public Date getExpirationDateFromToken(String token) {

        return getClaimFromToken(token, Claims::getExpiration);

    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {

        final Claims claims = getAllClaimsFromToken(token);

        return claimsResolver.apply(claims);

    }


    private Claims getAllClaimsFromToken(String token) {

        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

    }


    private Boolean isTokenExpired(String token) {

        final Date expiration = getExpirationDateFromToken(token);

        return expiration.before(new Date());

    }


    public String generateToken(UserDetails userDetails) {

//        Map<String, Object> claims = new HashMap<>();
////        claims.put("role", ((User) userDetails).getRole());
//        return doGenerateToken(claims, userDetails.getUsername());
        Map<String, Object> claims = new HashMap<>();

        if (userDetails instanceof AccountDetailsImpl) {
            AccountDetailsImpl userDetailsImpl = (AccountDetailsImpl) userDetails;
            List<String> roles = userDetailsImpl.getUser().getUserRoles().stream()
                    .map(userRole -> userRole.getRole().getRoleName())
                    .collect(Collectors.toList());
            claims.put("userRoles", roles);
        }

        return doGenerateToken(claims, userDetails.getUsername());
    }


    private String doGenerateToken(Map<String, Object> claims, String subject) {

//        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
//
//                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
//
//                .signWith(SignatureAlgorithm.HS512, secret).compact();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }


    public Boolean validateToken(String token, UserDetails userDetails) {

        final String username = getUsernameFromToken(token);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));

    }
}
