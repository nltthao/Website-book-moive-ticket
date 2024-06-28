package com.thuthao.beta.controller;

import com.thuthao.beta.service.RoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("*")
@RestController
@Api(description = "Api room")
@RequestMapping("/room")
public class RoomController {
    @Autowired
    RoomService roomService;

    @ApiOperation(value = "Lấy danh sách các rạp")
    @GetMapping("")
    public ResponseEntity<?> getAllRoom(){
        return ResponseEntity.ok(roomService.getAllRoom());
    }

}
