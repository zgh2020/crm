package com.qzsoft.testdata


import org.springframework.stereotype.Service

@Service
class TestGroovy {
    String sayHello() {
        def greet = "Hello, world!"
        System.out.println(greet);
    }
}
